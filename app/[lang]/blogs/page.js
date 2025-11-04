import getDictionary from "../dictionaries/dictionary";

const BlogsPage = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  const { heading, articles } = dict.blogs;
  return (
    <div>
      <h2 className="text-2xl font-bold my-3 ">{heading}</h2>

      {articles.map((article) => (
        <p key={article} className="my-3 border-l-2 border-green-600 pl-2">
          {article}
        </p>
      ))}
    </div>
  );
};
export default BlogsPage;
