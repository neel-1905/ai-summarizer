import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { articleApi } from "../redux/article";

type Article = {
  url: string;
  summary: string;
};

const Summary = () => {
  const [getSummary, { error, isFetching }] =
    articleApi.useLazyGetSummaryQuery();

  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [copied, setCopied] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (error) {
      console.log(error);
      setArticle({ ...article, summary: "" });
      return;
    }

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      console.log(newArticle);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  useEffect(() => {
    const articlesFromLocal = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );

    if (articlesFromLocal) {
      setAllArticles(articlesFromLocal);
    }
  }, []);

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="Link Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter URL of an article"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            type="submit"
          >
            ↵
          </button>
        </form>

        {/* URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setArticle(item);
                }}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="Copy"
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p className="font-satoshi flex-1 text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="Loading"
            className="w-20 h-20 object-contain"
          />
        ) : error && !article.summary ? (
          <p className="font-inter font-bold text-black text-center">
            Well that wasn't supposed to happen! <br />
            <span className="font-satoshi font-normal text-gray-700">
              {(error as any)?.data?.message ||
                "Something went wrong! Make sure the URL is valid!"}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Summary;
