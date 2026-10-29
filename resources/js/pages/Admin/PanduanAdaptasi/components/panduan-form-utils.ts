import type { SubmissionMaps } from './panduan-form-types';

export type ValidationErrors = Record<string, string>;

/**
 * Mengembalikan index payload → index form setelah baris kosong dibuang,
 * supaya pesan error server jatuh di baris form yang benar.
 */
export function normalizeNestedServerErrors(
    errors: ValidationErrors,
    maps: SubmissionMaps,
): ValidationErrors {
    const normalized: ValidationErrors = {};

    for (const [key, message] of Object.entries(errors)) {
        const linkMatch = key.match(/^nodes\.(\d+)\.links\.(\d+)\.(\w+)$/);

        if (linkMatch) {
            const payloadNodeIndex = Number(linkMatch[1]);
            const payloadLinkIndex = Number(linkMatch[2]);
            const formNodeIndex = maps.nodes[payloadNodeIndex] ?? payloadNodeIndex;
            const formLinkIndex =
                maps.links[payloadNodeIndex]?.[payloadLinkIndex] ?? payloadLinkIndex;

            normalized[`nodes.${formNodeIndex}.links.${formLinkIndex}.${linkMatch[3]}`] = message;
            continue;
        }

        const tagMatch = key.match(/^nodes\.(\d+)\.tags\.(\d+)\.(\w+)$/);

        if (tagMatch) {
            const payloadNodeIndex = Number(tagMatch[1]);
            const payloadTagIndex = Number(tagMatch[2]);
            const formNodeIndex = maps.nodes[payloadNodeIndex] ?? payloadNodeIndex;
            const formTagIndex =
                maps.tags[payloadNodeIndex]?.[payloadTagIndex] ?? payloadTagIndex;

            normalized[`nodes.${formNodeIndex}.tags.${formTagIndex}.${tagMatch[3]}`] = message;
            continue;
        }

        const nodeMatch = key.match(/^nodes\.(\d+)\.(\w+)$/);

        if (nodeMatch) {
            const payloadNodeIndex = Number(nodeMatch[1]);
            const formNodeIndex = maps.nodes[payloadNodeIndex] ?? payloadNodeIndex;

            normalized[`nodes.${formNodeIndex}.${nodeMatch[2]}`] = message;
            continue;
        }

        normalized[key] = message;
    }

    return normalized;
}

/** URL valid (http/https) — kini tinggal di utils bersama, di-export ulang demi kompatibilitas. */
export { isValidUrl } from '@/utils/imageUrl';
