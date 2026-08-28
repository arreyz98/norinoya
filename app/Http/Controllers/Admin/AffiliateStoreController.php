<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAffiliateStoreRequest;
use App\Http\Requests\UpdateAffiliateStoreRequest;
use App\Models\AffiliateStore;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AffiliateStoreController extends Controller
{
    public function index(): Response
    {
        $affiliateStores = AffiliateStore::query()
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render(
            'Admin/AffiliateStores/Index',
            [
                'affiliateStores' => $affiliateStores,
            ]
        );
    }

    public function create(): Response
    {
        return Inertia::render(
            'Admin/AffiliateStores/Create'
        );
    }

    public function store(
        StoreAffiliateStoreRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name']
        );

        AffiliateStore::create($data);

        return to_route(
            'admin.affiliate-stores.index'
        )->with(
            'success',
            'Affiliate store berhasil ditambahkan.'
        );
    }

    public function edit(
        AffiliateStore $affiliateStore
    ): Response {
        return Inertia::render(
            'Admin/AffiliateStores/Edit',
            [
                'affiliateStore' => $affiliateStore,
            ]
        );
    }

    public function update(
        UpdateAffiliateStoreRequest $request,
        AffiliateStore $affiliateStore
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name'],
            $affiliateStore->id
        );

        $affiliateStore->update($data);

        return to_route(
            'admin.affiliate-stores.index'
        )->with(
            'success',
            'Affiliate store berhasil diperbarui.'
        );
    }

    public function destroy(
        AffiliateStore $affiliateStore
    ): RedirectResponse {
        if ($affiliateStore->affiliateLinks()->exists()) {
            return back()->with(
                'error',
                'Affiliate store tidak dapat dihapus karena masih digunakan oleh affiliate link.'
            );
        }

        $affiliateStore->delete();

        return to_route(
            'admin.affiliate-stores.index'
        )->with(
            'success',
            'Affiliate store berhasil dihapus.'
        );
    }

    private function generateUniqueSlug(
        string $name,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($name);

        $originalSlug = $slug;
        $counter = 1;

        while (
            AffiliateStore::query()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->where(
                        'id',
                        '!=',
                        $ignoreId
                    )
                )
                ->exists()
        ) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}