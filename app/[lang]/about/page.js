import getDictionary from "../dictionaries/dictionary";

const AboutPage = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  const { heading, description } = dict.about;

  return (
    <div>
      <h2 className="text-2xl font-bold my-3 ">{heading}</h2>

      <p>{description}</p>
    </div>
  );
};
export default AboutPage;
