import React, { useState } from 'react';
import Tile from './Tile';
import tileImage1 from '../../images/tile_1.webp';
import tileImage2 from '../../images/tile_2.jfif';
import tileImage3 from '../../images/tile_4.jfif';
import tileImage4 from '../../images/tile_3.jfif';
import ViewMoreButton from './ViewMoreButton';

const TileSection = () => {
  // Состояние для контроля отображения дополнительных элементов
  const [showMore, setShowMore] = useState(false);

  // Функция для переключения состояния
  const handleViewMore = () => {
    setShowMore(!showMore);
  };

  return (
      <section className="section_tiles">
          <div className="tiles">
              <Tile
                  image={tileImage1}
                  altText="Tile 1"
                  title="Blue jeans"
                  description="Australian rock band formed in Sydney in November 1973 by Scottish brothers Malcolm and Angus Young."
              />
              <Tile
                  image={tileImage2}
                  altText="Tile 2"
                  title="Jacket"
                  description="Black Sabbath is a British rock band formed in Birmingham, England, in 1968 and had a significant influence on the development of rock music, especially heavy metal."
              />
              <Tile
                  image={tileImage3}
                  altText="Tile 3"
                  title="Black sneakers"
                  description="Led Zeppelin is a British rock band formed in September 1968 in London, and is recognized as one of the most successful, innovative and influential in modern history."
              />
          </div>



          {/* Отображение дополнительных элементов при нажатии на кнопку */}
          {showMore && (
            <div className="extra-content">
              <Tile
                  image={tileImage4}
                  altText="Tile 3"
                  title="Black sneakers"
                  description="Led Zeppelin is a British rock band formed in September 1968 in London, and is recognized as one of the most successful, innovative and influential in modern history."
              />
            </div>
          )}
          {/* Кнопка для показа дополнительных элементов */}
          <ViewMoreButton onClick={handleViewMore} />
      </section>
  );
};

export default TileSection;
