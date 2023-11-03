import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import {
  useGetArticlesQuery,
  useGetNextArticleQuery,
  useGetOneArticleQuery,
  useGetPrevArticleQuery,
} from "../../Redux/store/articles";

function Article() {
  const { id } = useParams();
  let title = id.replaceAll("-", " ").slice(1);
  let nextArticleId = Number(id.slice(0, 1)) + 1;
  let prevArticleId = Number(id.slice(0, 1)) - 1;

  const { data: article, isSuccess, isLoading } = useGetOneArticleQuery(title);
  const { data: nextArticle } = useGetNextArticleQuery(nextArticleId);
  const { data: prevArticle } = useGetPrevArticleQuery(prevArticleId);
  const { data: articles } = useGetArticlesQuery();

  const {
    category,
    author,
    headers,
    src,
    title: articleTitle,
    content,
    lastword,
  } = !isLoading && article[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Header />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "مقالات", to: "" },
          { id: 2, title, to: "" },
        ]}
      />
      {isLoading && <ScreenLoader />}
      {isSuccess && (
        <div className="p-10">
          <p className="mb-8 text-sm w-fit py-1 px-2 bg-rose-600 text-white">
            {category}
          </p>
          <h2 className="font-bold text-4xl dark:text-white">{headers[0]}</h2>
          <p className=" my-5 opacity-50 dark:text-white">
            ارسال توسط {author}
          </p>
          <div className="flex justify-between gap-x-10">
            <div className="w-full md:w-9/12 text-xl leading-10">
              <div className="px-8 pb-10 border border-solid border-gray-200 dark:border-gray-700 dark:text-gray-300">
                <div className="space-y-10">
                  <img
                    loading="lazy"
                    className="m-auto"
                    src={src[0]}
                    alt={articleTitle}
                  />
                  <p>{content[0]}</p>
                </div>
                <div className="space-y-10 mt-10">
                  <h2 className="font-bold text-3xl dark:text-white">
                    {headers[1]}
                  </h2>
                  <img
                    loading="lazy"
                    className="m-auto my-10"
                    src={src[1]}
                    alt={articleTitle}
                  />
                  <p>{content[1]}</p>
                </div>
                <div className="space-y-10 mt-10">
                  <h2 className="font-bold text-3xl dark:text-white">
                    {headers[2]}
                  </h2>
                  <img
                    loading="lazy"
                    className="m-auto my-10"
                    src={src[2]}
                    alt={articleTitle}
                  />
                  <p>{content[2]}</p>
                </div>
                <div className="space-y-10 mt-10">
                  <h2 className="font-bold text-3xl dark:text-white">
                    {headers[3]}
                  </h2>
                  <img
                    loading="lazy"
                    className="m-auto my-10"
                    src={src[3]}
                    alt={articleTitle}
                  />
                  <p>{content[3]}</p>
                </div>
                <div className="space-y-10 mt-10">
                  <h2 className="font-bold text-3xl dark:text-white">
                    حرف آخر
                  </h2>
                  <p>{lastword}</p>
                </div>
              </div>
              <div className="dark:text-white mt-10 flex justify-between items-center py-10 border-2 border-solid border-white border-b-gray-200 dark:border-gray-800 dark:border-b-gray-700">
                {nextArticle && (
                  <div className="flex items-center">
                    <IoIosArrowForward className="border border-solid rounded-full w-10 h-10 p-2 opacity-50" />
                    <div className="flex flex-col mx-4 text-base space-y-1">
                      <span className="opacity-30 ">جدیدتر</span>
                      <Link
                        to={`/${
                          nextArticle[0]
                            ? nextArticle[0].id +
                              nextArticle[0].title.replaceAll(" ", "-")
                            : ""
                        }`}
                        className="hover:text-rose-600"
                      >
                        {nextArticle[0] ? nextArticle[0].title : ""}
                      </Link>
                    </div>
                  </div>
                )}
                {prevArticle && (
                  <div className="flex items-center">
                    <div className="text-left flex flex-col mx-4 text-base space-y-1">
                      <span className="opacity-30 ">قدیمی تر</span>
                      <Link
                        to={`/${
                          prevArticle[0]
                            ? prevArticle[0].id +
                              prevArticle[0].title.replaceAll(" ", "-")
                            : ""
                        }`}
                        className="hover:text-rose-600"
                      >
                        {prevArticle[0] ? prevArticle[0].title : ""}
                      </Link>
                    </div>
                    <IoIosArrowBack className="border border-solid rounded-full w-10 h-10 p-2 opacity-50" />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block h-fit w-3/12 border border-solid border-gray-200 dark:border-gray-600">
              <h3 className="font-bold bg-gray-100 p-6 text-xl dark:bg-gray-700 dark:text-white">
                نوشته های تازه
              </h3>
              <ul className="">
                {articles &&
                  articles.map((article) => (
                    <li
                      key={article.id}
                      className={`${
                        article.title === title
                          ? "bg-rose-400 font-bold dark:text-gray-800"
                          : ""
                      } p-6 border border-solid border-white border-b-gray-200 hover:text-gray-500 dark:border-gray-600 dark:text-white`}
                    >
                      <Link
                        to={`/${
                          article.id + article.title.replaceAll(" ", "-")
                        }`}
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default Article;
