import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


async function seed() {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();


    const pro = await prisma.user.create({ data: { name: 'pro' } })
    const noobmaster = await prisma.user.create({ data: { name: 'noobmaster' } })


    const post1 = await prisma.post.create({
        data: {
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra. Ullamcorper dignissim cras tincidunt lobortis feugiat. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Duis tristique sollicitudin nibh sit. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Arcu ac tortor dignissim convallis aenean. Risus quis varius quam quisque id diam. Neque convallis a cras semper auctor neque vitae. Cras semper auctor neque vitae. Quis auctor elit sed vulputate mi sit. Aliquam sem fringilla ut morbi tincidunt augue. Sit amet nisl suscipit adipiscing. Iaculis nunc sed augue lacus viverra vitae congue. Rhoncus est pellentesque elit ullamcorper dignissim. Eget velit aliquet sagittis id consectetur purus ut faucibus. Ipsum suspendisse ultrices gravida dictum fusce ut placerat.",
            title: "Post 1"
        }
    })

    const post2 = await prisma.post.create({
        data: {
            body: "Commodo quis imperdiet massa tincidunt nunc. Ut venenatis tellus in metus vulputate. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Nunc sed id semper risus in hendrerit gravida rutrum quisque. Enim sit amet venenatis urna cursus eget. At varius vel pharetra vel turpis nunc eget lorem. Lobortis feugiat vivamus at augue eget arcu. Enim neque volutpat ac tincidunt vitae semper quis lectus. Tellus in metus vulputate eu scelerisque. Urna condimentum mattis pellentesque id nibh tortor. Pulvinar pellentesque habitant morbi tristique senectus. Praesent semper feugiat nibh sed pulvinar proin gravida. At risus viverra adipiscing at in tellus. Interdum velit euismod in pellentesque massa. Tristique magna sit amet purus gravida quis blandit turpis cursus. A erat nam at lectus urna duis convallis.",
            title: "Post 2"
        }
    })


    const comment1 = await prisma.comment.create({
        data: {
            message: " I am a root comment",
            userId: pro.id,
            postId: post1.id
        }
    })

    const comment2 = await prisma.comment.create({
        data: {
            parentId: comment1.id,
            message: " I am a child comment",
            userId: noobmaster.id,
            postId: post1.id
        }
    })

    const comment3 = await prisma.comment.create({
        data:{
            message: "I am another root comment",
            userId: noobmaster.id,
            postId:post2.id
        }
    })

}

seed()