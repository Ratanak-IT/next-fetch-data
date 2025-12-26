import { PostResponse } from "@/lib/types/posts";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function Cards({
    userId,
    id,
    title,
    body
}:PostResponse){
    return(
        <>
        <Card>
            <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
                {body}
            </CardDescription>
            <CardAction>
                <Button variant="link">{userId} || {id}</Button>
            </CardAction>
            </CardHeader>
        </Card>
        </>
    )
}