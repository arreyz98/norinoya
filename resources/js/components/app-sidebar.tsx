import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ExternalLink, Folder, LayoutGrid, LayoutPanelTop, Newspaper, Store } from 'lucide-react';
import AppLogo from './app-logo';

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
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
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
