import React from "react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlCLient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
	const [{ data }] = usePostsQuery();

	return (
		<>
			<NavBar />
			<div>Hello world!</div>
			<br />
			{!data ? (
				<div>Loading...</div>
			) : (
				data.posts.map((p) => <div key={p.id}>{p.title}</div>)
			)}
		</>
	);
};

export default withUrqlClient(createUrqlCLient, { ssr: true })(Index);
