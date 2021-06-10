import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
	post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
	const [loadingState, setLoadingState] =
		useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
			"not-loading"
		);
	const [, vote] = useVoteMutation();
	return (
		<Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
			<IconButton
				onClick={async () => {
					if (post.voteStatus === 1) {
						return;
					}
					setLoadingState("updoot-loading");
					await vote({
						value: 1,
						postId: post.id,
					});
					setLoadingState("not-loading");
				}}
				colorScheme={post.voteStatus === 1 ? "green" : undefined}
				isLoading={loadingState === "updoot-loading"}
				aria-label="upvote"
				icon={<ChevronUpIcon />}
			/>
			{post.points}
			<IconButton
				onClick={async () => {
					if (post.voteStatus === -1) {
						return;
					}
					setLoadingState("downdoot-loading");
					await vote({
						value: -1,
						postId: post.id,
					});
					setLoadingState("not-loading");
				}}
				colorScheme={post.voteStatus === -1 ? "red" : undefined}
				isLoading={loadingState === "downdoot-loading"}
				aria-label="downvote"
				icon={<ChevronDownIcon />}
			/>
		</Flex>
	);
};
