import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { images } from "../../constants";
import { getSinglePost } from "../../services/index/posts";
import Editor from "../../components/editor/Editor";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setBreadCrumbsData([
        {
          link: "/",
          name: "Home",
        },
        {
          link: "/blog",
          name: "Blog",
        },
        {
          link: `/blog/${data?.slug}`,
          name: `${data?.title}`,
        },
      ]);
    },
  });

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="rounded-xl w-full max-h-[300px] sm:max-h-[500px]"
              src={data?.photo ? data?.photo : images.samplePostImage}
              alt={data?.title}
            />
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
                  to={`/blog?category=${category.name}`}
                  key={category._id}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>
            <CommentsContainer
              className="mt-10"
              loggedInUserId={userState.userInfo?._id}
              comments={data?.comments}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={data?.suggestedPosts}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                Share on:
              </h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};
export default ArticleDetailPage;
