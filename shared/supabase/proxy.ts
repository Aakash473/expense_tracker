import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},

				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => {
						request.cookies.set(name, value);
					});

					supabaseResponse = NextResponse.next({
						request,
					});

					cookiesToSet.forEach(({ name, value, options }) => {
						supabaseResponse.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	const { data } = await supabase.auth.getClaims();

	const user = data?.claims;

	if (!user) {
		// oRPC requests must receive an HTTP 401, not a login page.
		if (request.nextUrl.pathname.startsWith("/rpc")) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Allow unauthenticated access to login and auth routes.
		if (
			!request.nextUrl.pathname.startsWith("/login") &&
			!request.nextUrl.pathname.startsWith("/auth")
		) {
			const url = request.nextUrl.clone();
			url.pathname = "/login";

			return NextResponse.redirect(url);
		}
	}
}
