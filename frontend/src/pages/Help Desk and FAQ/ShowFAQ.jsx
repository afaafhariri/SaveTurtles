import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import GridPatternBG from "../../components/GridPatternBG";
const ShowFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/faq");
        setFaqs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(
          "Failed to fetch FAQs. Please check console for more details."
        );
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);
  const sortedFaqs = [...faqs].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const filteredFaqs = sortedFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center relative">
      <GridPatternBG className="z-0" strokeColor="rgba(128, 128, 128, 0.2)" />
      <div className="absolute top-0 left-0 p-6 flex items-center space-x-4 z-10">
        <h1 className="text-2xl font-semibold text-primary">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="absolute top-4 right-4 flex space-x-4 items-center z-10">
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${
            sortOrder === "asc" && "bg-primary text-white"
          }`}
          onClick={() => setSortOrder("asc")}
        >
          Oldest
        </button>
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${
            sortOrder === "desc" && "bg-primary text-white"
          }`}
          onClick={() => setSortOrder("desc")}
        >
          Latest
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by question"
          className="px-4 py-2 border border-primary_light rounded"
        />
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-4xl mt-12 z-10">
          {filteredFaqs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-primary_light">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-primary_light">{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <p className="text-primary">No FAQs available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowFAQ;
