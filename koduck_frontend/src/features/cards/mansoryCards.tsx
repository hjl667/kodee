import { Topic } from "@/types/tree";

const getCardHeight = (name) => {
  const baseHeight = 50;
  const textFactor = name.length * 2;
  const randomFactor = Math.floor(Math.random() * 30);
  return `${baseHeight + textFactor + randomFactor}px`;
};

interface MansoryCardsProps {
  isMobileView: boolean;
  filteredArticles: Topic[];
  handleCardClick: (id: string) => void;
}

const MansoryCards: React.FC<MansoryCardsProps> = ({
  isMobileView,
  filteredArticles,
  handleCardClick,
}) => {
  return (
    <div
      className={`${
        isMobileView ? "w-full" : "w-2/3"
      } h-[70vh] overflow-y-auto`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        className="masonry-container"
        style={{
          columnCount: isMobileView ? 2 : 4,
          columnGap: "1rem",
          padding: "0.5rem",
          width: "100%",
        }}
      >
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-4 touch-action-manipulation"
              onClick={() => handleCardClick(article.id)}
              style={{
                backgroundColor: "rgb(128, 128, 128,0.2)",
                minHeight: getCardHeight(article.name),
                padding: "1.5rem",
                borderRadius: "9px",
                display: "inline-block",
                width: "100%",
              }}
            >
              {article.name}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default MansoryCards;
