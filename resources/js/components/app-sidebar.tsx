import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ExternalLink, Folder, LayoutGrid, LayoutPanelTop, Newspaper, Store } from 'lucide-react';
import logoDarkUrl from '/public/assets/images/logo-dark.png';
import logoLightUrl from '/public/assets/images/logo-light.png';

const mainNavItems: (NavItem & { target?: string })[] = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Katalog',
        url: '/admin/books',
        icon: LayoutPanelTop,
    },
    {
        title: 'Berita',
        url: '/admin/news',
        icon: Newspaper,
    },
    {
        title: 'Kios & Preloved',
        url: '/admin/kios',
        icon: Store,
    },
    {
        title: 'Lihat Website',
        url: '/',
        icon: ExternalLink,
        target: '_blank',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Genre',
        url: '/admin/genres',
        icon: Folder,
    },
    {
        title: 'Author',
        url: '/admin/authors',
        icon: BookOpen,
    },
    {
        title: 'Series',
        url: '/admin/book-series',
        icon: BookOpen,
    },
    {
        title: 'Penerbit',
        url: '/admin/publishers',
        icon: BookOpen,
    },
    {
        title: 'Edisi',
        url: '/admin/editions',
        icon: BookOpen,
    },
    {
        title: 'Status Cerita',
        url: '/admin/story-statuses',
        icon: BookOpen,
    },
    {
        title: 'Toko Afiliasi',
        url: '/admin/affiliate-stores',
        icon: BookOpen,
    },
    {
        title: 'Toko Partner Kios',
        url: '/admin/kios-partners',
        icon: Store,
    },
];

export function AppSidebar() {
    const { appearance } = useAppearance();
    const isDark =
        appearance === 'dark' ||
        (appearance === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                    <img
             src={isDark ?  logoDarkUrl : logoLightUrl }
             alt="Norinoya Logo"
             className="h-60 object-contain transition-transform  pt-6"
           />
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
