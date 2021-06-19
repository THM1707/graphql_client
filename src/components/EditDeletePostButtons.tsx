import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
	id: number;
	creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
	id,
	creatorId,
}) => {
	const [{ data: meData }] = useMeQuery();
	const [, deletePost] = useDeletePostMutation();

	if (meData?.me?.id !== creatorId) {
		return null;
	}

	return (
		<Box>
			<NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
				<IconButton
					as={Link}
					mr={2}
					aria-label="update post"
					icon={<EditIcon />}
				>
					update
				</IconButton>
			</NextLink>

			<IconButton
				onClick={() => {
					deletePost({ id });
				}}
				aria-label="delete post"
				icon={<DeleteIcon />}
			>
				delete
			</IconButton>
		</Box>
	);
};
