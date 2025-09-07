"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm w-full">
			<CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
				<CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Sign Up</CardTitle>
				<CardDescription className="text-sm sm:text-base text-gray-600">
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent className="px-4 sm:px-6">
				<div className="grid gap-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name" className="text-sm font-medium text-gray-700">First name</Label>
							<Input
								id="first-name"
								placeholder="Max"
								required
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								value={firstName}
								className="h-10 sm:h-11 text-sm sm:text-base"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last name</Label>
							<Input
								id="last-name"
								placeholder="Robinson"
								required
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								value={lastName}
								className="h-10 sm:h-11 text-sm sm:text-base"
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="email@example.com"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
							className="h-10 sm:h-11 text-sm sm:text-base"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder="Create a password"
							className="h-10 sm:h-11 text-sm sm:text-base"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">Confirm Password</Label>
						<Input
							id="password_confirmation"
							type="password"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							autoComplete="new-password"
							placeholder="Confirm your password"
							className="h-10 sm:h-11 text-sm sm:text-base"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="image" className="text-sm font-medium text-gray-700">Profile Image (optional)</Label>
						<div className="flex items-end gap-3 sm:gap-4">
							{imagePreview && (
								<div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
									<Image
										src={imagePreview}
										alt="Profile preview"
										layout="fill"
										objectFit="cover"
									/>
								</div>
							)}
							<div className="flex items-center gap-2 w-full">
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="w-full h-10 sm:h-11 text-sm sm:text-base"
								/>
								{imagePreview && (
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="flex-shrink-0 h-10 sm:h-11 px-2 sm:px-3"
										onClick={() => {
											setImage(null);
											setImagePreview(null);
										}}
									>
										<X className="h-3 w-3 sm:h-4 sm:w-4" />
									</Button>
								)}
							</div>
						</div>
					</div>
					<Button
						type="submit"
						className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base mt-2"
						disabled={loading}
						onClick={async () => {
							await authClient.signUp.email({
								email,
								password,
								name: `${firstName} ${lastName}`,
								image: image ? await convertImageToBase64(image) : "",
								callbackURL: "/",
								fetchOptions: {
									onResponse: () => {
										setLoading(false);
									},
									onRequest: () => {
										setLoading(true);
									},
									onError: (ctx) => {
										// toast.error(ctx.error.message);
                                        alert(ctx.error.message);
									},
									onSuccess: async () => {
										router.push("/");
									},
								},
							});
						}}
					>
						{loading ? (
							<>
								<Loader2 className="animate-spin mr-2 h-3 w-3 sm:h-4 sm:w-4" />
								<span className="text-sm sm:text-base">Creating account...</span>
							</>
						) : (
							<span className="text-sm sm:text-base">Create Account</span>
						)}
					</Button>
				</div>
			</CardContent>
			<CardFooter className="px-4 sm:px-6">
				<div className="flex justify-center w-full border-t py-3 sm:py-4">
					<p className="text-center text-xs sm:text-sm text-neutral-500">
						Secured by <span className="text-orange-400 font-medium">better-auth</span>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}