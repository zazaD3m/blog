import { Link } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";

const breadCrumbsData = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/blog",
    name: "Blog",
  },
  {
    link: "/blog/1",
    name: "Article title",
  },
];

const postsData = [
  {
    _id: "1",
    img: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    img: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    img: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    img: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];

const tagsData = [
  "Medical",
  "Lifestyle",
  "Learn",
  "Healthy",
  "Food",
  "Diet",
  "Education",
];

const ArticleDetailPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="rounded-xl w-full"
            src={images.Post1Image}
            alt="laptop"
          />
          <Link
            className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
            to={`/blog?category=selectedCategory`}
          >
            EDUCATION
          </Link>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              aliquam aperiam, harum accusantium, natus ut debitis, veritatis
              dolores molestiae obcaecati quibusdam numquam nostrum. Nostrum
              aspernatur est fugit praesentium obcaecati voluptate ex maiores
              atque quo, consequuntur distinctio sapiente molestias et officiis
              dolorem quam placeat, repellat fuga? Quo ipsa enim ullam ad.
            </p>
          </div>
          <CommentsContainer className="mt-10" loggedInUserId="a" />
        </article>
        <SuggestedPosts
          header="Latest Article"
          posts={postsData}
          tags={tagsData}
          className="mt-8 lg:mt-0 lg:max-w-xs"
        />
      </section>
    </MainLayout>
  );
};
export default ArticleDetailPage;
