import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

type LoginForm = {
    email: string;
    password: string;
    [key: string]: string;
}

interface LoginPageProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function LoginPage({
    status,
}: LoginPageProps) {
    const { data, setData, post, processing, errors, reset } =
        useForm<LoginForm>({
            email: '',
            password: '',
        });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => {
                reset('password');
            },
        });
    };

    return (
        <>
            <Head title="Login in" />

            <div
                id="login-page-container"
                className="
                    min-h-screen
                    w-full
                    bg-[#E5ECF6]
                    flex
                    items-center
                    justify-center
                    px-4
                    py-6
                    sm:px-6
                    sm:py-8
                    lg:px-10
                "
            >
                <div className="w-full max-w-[1020px]">
                    <div
                        id="login-card"
                        className="
                            w-full
                            overflow-hidden
                            rounded-[28px]
                            sm:rounded-[32px]
                            bg-white
                            shadow-[0_24px_70px_-12px_rgba(17,42,18,0.18)]
                            grid
                            grid-cols-1
                            lg:grid-cols-12
                            min-h-[520px]
                            lg:min-h-[560px]
                        "
                    >
                        {/* =====================================================
                            LEFT / BRAND PANEL
                        ====================================================== */}
                        <div
                            id="brand-hero-panel"
                            className="
                                hidden
                                lg:flex
                                lg:col-span-5
                                bg-[#112A12]
                                text-white
                                p-10
                                xl:p-12
                                flex-col
                                justify-between
                                relative
                                overflow-hidden
                                lg:rounded-r-[48px]
                                z-10
                                select-none
                            "
                        >
                            {/* Brand */}
                            <div>
                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-white/10
                                        text-emerald-200
                                        text-xs
                                        font-medium
                                        backdrop-blur-sm
                                        mb-6
                                    "
                                >
                                    <ShieldCheck className="w-3.5 h-3.5" />

                                    <span>
                                        Login Admin Norinoya
                                    </span>
                                </div>

                                <h2
                                    className="
                                        text-2xl
                                        xl:text-3xl
                                        font-semibold
                                        tracking-tight
                                        text-white/95
                                        leading-snug
                                    "
                                >
                                    Selamat Datang di Norinoya Admin Panel
                                </h2>
                            </div>

                            {/* Accent */}
                            <div className="my-8 flex items-center justify-start py-6">
                                <div className="w-16 h-1 bg-emerald-500/20 rounded-full" />
                            </div>

                            {/* Footer */}
                            <div
                                className="
                                    pt-4
                                    border-t
                                    border-white/10
                                    flex
                                    flex-col
                                    gap-3
                                "
                            >
                                <div className="flex items-center gap-4 text-white/60">
                                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/70">
                                        f
                                    </span>

                                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/70">
                                        in
                                    </span>

                                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/70">
                                        ig
                                    </span>
                                </div>

                                <div className="text-xs text-white/50">
                                    <p>© Norinoya</p>

                                    <p className="text-[11px] text-white/40">
                                        All rights reserved
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* =====================================================
                            RIGHT / LOGIN FORM
                        ====================================================== */}
                        <div
                            id="login-form-panel"
                            className="
                                col-span-1
                                lg:col-span-7
                                bg-white
                                px-6
                                py-7
                                sm:px-10
                                sm:py-10
                                lg:px-12
                                xl:px-14
                                flex
                                flex-col
                            "
                        >
                            {/* Logo */}
                           <div
                                className="
                                    h-12
                                    sm:h-14
                                    flex
                                    items-center
                                    justify-center
                                    sm:justify-end
                                    mb-8
                                "
                            >
                                <img
                                    src="/assets/images/logo-light.png"
                                    alt="Norinoya"
                                    className="
                                        h-96
                                        w-auto
                                        object-contain
                                    "
                                />
                            </div>

                            {/* Form Content */}
                            <div className="max-w-md w-full mx-auto my-auto">
                                <div className="mb-8 text-center sm:text-left">
                                    <h1
                                        className="
                                            text-2xl
                                            sm:text-3xl
                                            font-bold
                                            text-slate-900
                                            tracking-tight
                                        "
                                    >
                                        Login
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Masukkan kredensial Anda untuk masuk
                                        ke halaman admin.
                                    </p>
                                </div>

                                {status && (
                                    <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                                        {status}
                                    </div>
                                )}

                                <form
                                    id="login-form"
                                    onSubmit={submit}
                                    className="space-y-6"
                                >
                                    {/* EMAIL */}
                                    <div
                                        className="space-y-1.5"
                                        id="login-input-group"
                                    >
                                        <label
                                            htmlFor="login-input"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-wider
                                                text-slate-400
                                                uppercase
                                            "
                                        >
                                            Email
                                        </label>

                                        <div
                                            className="
                                                relative
                                                border-b
                                                border-slate-200
                                                focus-within:border-[#112A12]
                                                transition-colors
                                                pb-1.5
                                                flex
                                                items-center
                                            "
                                        >
                                            <input
                                                id="login-input"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="nama@email.com"
                                                autoComplete="username"
                                                autoFocus
                                                className="
                                                    w-full
                                                    text-slate-800
                                                    text-sm
                                                    font-medium
                                                    bg-transparent
                                                    focus:outline-none
                                                    placeholder:text-slate-300
                                                    py-1
                                                "
                                            />
                                        </div>

                                        {errors.email && (
                                            <p className="text-xs text-red-500 pt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* PASSWORD */}
                                    <div
                                        className="space-y-1.5 pt-2"
                                        id="password-input-group"
                                    >
                                        <label
                                            htmlFor="password-input"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-wider
                                                text-slate-400
                                                uppercase
                                            "
                                        >
                                            PASSWORD
                                        </label>

                                        <div
                                            className="
                                                relative
                                                border-b
                                                border-slate-200
                                                focus-within:border-[#112A12]
                                                transition-colors
                                                pb-1.5
                                                flex
                                                items-center
                                            "
                                        >
                                            <input
                                                id="password-input"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="••••••••••••"
                                                autoComplete="current-password"
                                                className="
                                                    w-full
                                                    text-slate-800
                                                    text-sm
                                                    font-medium
                                                    bg-transparent
                                                    focus:outline-none
                                                    placeholder:text-slate-300
                                                    py-1
                                                    tracking-wider
                                                "
                                            />
                                        </div>

                                        {errors.password && (
                                            <p className="text-xs text-red-500 pt-1">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* OPTIONS */}
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            pt-2
                                        "
                                        id="form-options-row"
                                    >
                             
                                    </div>

                                    {/* SUBMIT */}
                                    <div
                                        className="pt-4 flex justify-end"
                                        id="form-submit-row"
                                    >
                                        <button
                                            type="submit"
                                            id="submit-signin-btn"
                                            disabled={processing}
                                            className="
                                                w-full
                                                sm:w-auto
                                                bg-[#112A12]
                                                hover:bg-[#1c3f1e]
                                                disabled:opacity-60
                                                disabled:cursor-not-allowed
                                                active:scale-[0.98]
                                                text-white
                                                font-medium
                                                text-sm
                                                px-7
                                                py-3
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                gap-2.5
                                                shadow-md
                                                shadow-[#112A12]/20
                                                hover:shadow-lg
                                                hover:shadow-[#112A12]/30
                                                transition-all
                                                cursor-pointer
                                            "
                                        >
                                            <span>
                                                {processing
                                                    ? 'Logging in...'
                                                    : 'Login'}
                                            </span>

                                            {!processing && (
                                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Discord */}
                            <div
                                id="discord-community-section"
                                className="
                                    pt-6
                                    mt-8
                                    border-t
                                    border-slate-100
                                    flex
                                    flex-col
                                    sm:flex-row
                                    items-center
                                    justify-between
                                    gap-3
                                    text-xs
                                "
                            >
                                <span className="text-slate-500 text-center sm:text-left">
                                    Bergabung dengan komunitas kami di Discord
                                </span>

                                <a
                                    href="https://discord.gg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id="discord-link-btn"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-[#5865F2]/10
                                        hover:bg-[#5865F2]/20
                                        text-[#5865F2]
                                        hover:text-[#4752C4]
                                        font-semibold
                                        transition-colors
                                        duration-200
                                        cursor-pointer
                                        w-full
                                        sm:w-auto
                                    "
                                >
                                    <svg
                                        className="w-4 h-4 fill-current"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>

                                    <span>Discord</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}