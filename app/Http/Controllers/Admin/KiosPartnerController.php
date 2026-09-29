<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KiosPartner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KiosPartnerController extends Controller
{
    public function index(Request $request)
    {
        $query = KiosPartner::query()->withCount('kiosItems');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        $partners = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/KiosPartners/Index', [
            'partners' => $partners,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/KiosPartners/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:kios_partners,slug',
            'logo_url' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        KiosPartner::create($validated);

        return redirect()->route('admin.kios-partners.index')->with('success', 'Toko Partner berhasil ditambahkan!');
    }

    public function edit(KiosPartner $kios_partner)
    {
        return Inertia::render('Admin/KiosPartners/Edit', [
            'partner' => $kios_partner,
        ]);
    }

    public function update(Request $request, KiosPartner $kios_partner)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:kios_partners,slug,' . $kios_partner->id,
            'logo_url' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $kios_partner->update($validated);

        return redirect()->route('admin.kios-partners.index')->with('success', 'Toko Partner berhasil diperbarui!');
    }

    public function destroy(KiosPartner $kios_partner)
    {
        $kios_partner->delete();

        return redirect()->route('admin.kios-partners.index')->with('success', 'Toko Partner berhasil dihapus!');
    }
}
