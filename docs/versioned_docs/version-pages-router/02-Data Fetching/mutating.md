---
slug: /data-fetching/mutating
sidebar_position: 9
---

# Mutating Data

It is possible to use the [useSwr mutate](https://swr.vercel.app/docs/mutation) function to mutate data on the client. The data-fetching hooks expose the "bound mutate" function from swr. Below is an example of optimistically updating the UI to like a post.

```js title="Example of liking a post logic would look like"
const LikePost = () => {
    const { data, mutate } = usePost();

    if (loading) {
        return <Placeholder />
    }

    function like() {
        if (!data) {
            return;
        }

        // run an async function `makeRequestToLikePost` 
        // but update UI immediately with `optimisticData`
        // once the async function resolves, 
        // it will revalidate the data from the server
        // this assumes the next request to fetch the same post will 
        // return the updated count
        mutate(() => makeRequestToLikePost(data.post.id), {
            optimisticData: {
                ...data.post,
                meta: {
                    ...data.post.meta,
                    like_count: data.post.meta.like_count + 1
                }
            }
        });
    }
    return <Heart count={data.post.meta.like_count} onClick={() => {like()}} />
}
```

In the example above we're assuming a post has a meta field called `like_count` that holds the total number of likes the post has. When clicking the like button,
it will issue a remote fetch call to run the mutation on the server but update the UI immediately with `optimisticData``.

Once the remote mutation finishes running, another request will be issued by the framework to re-fetch the post, which we assume, will already have the updated `like_count`.

If for some reason, anything fails with the remote mutation, when revalidating the data will roll back to the previous value.