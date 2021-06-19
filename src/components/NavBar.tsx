import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const router = useRouter();
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	});
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

	let body = null;

	// data is loading
	if (fetching) {
	}
	// user not logged in
	else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Link mr={2}>Login</Link>
				</NextLink>
				<NextLink href="/register">
					<Link>Register</Link>
				</NextLink>{" "}
			</>
		);
	} else {
		body = (
			<Flex align="center">
				<NextLink href="/create-post">
					<Button as={Link} mr={4}>
						create post
					</Button>
				</NextLink>
				<Box mr={2}>{data.me.username}</Box>
				<Button
					variant="link"
					isLoading={logoutFetching}
					onClick={async () => {
						await logout();
						router.reload();
					}}
				>
					logout
				</Button>
			</Flex>
		);
	}

	return (
		<Flex position="sticky" zIndex={2} top={0} bg="tan" p={4} align="center">
			<Flex align="center" maxW={800} flex={1} m="auto">
				<NextLink href="/">
					<Link>
						<Heading>Lireddit</Heading>
					</Link>
				</NextLink>
				<Box ml={"auto"}>{body}</Box>
			</Flex>
		</Flex>
	);
};
