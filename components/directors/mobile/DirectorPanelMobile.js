import { Name } from '../Name';
import { useAppContext } from '../../../context/context';
import { imageUrlBuilder } from '../../../config/sanity';

const DirectorPanelMobile = ({
  director,
  setIndexFeatured,
  indexFeatured,
  index,
}) => {
  const { language, setDirectorFeatured, directorFeatured } = useAppContext();
  const {
    slug,
    name,
    mainImage,
    descEN,
    descFR,
    email,
    websiteUrl,
    instaUrl,
    rgb,
  } = director;

  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;

  const [forname, surname] = name.split(' ');
  return (
    <div
      className="director-panel-mobile"
      style={{
        backgroundImage: `url(${imageUrlBuilder
          .image(mainImage)
          .width(1920)
          .url()})`,
      }}
    >
      <Name surname={surname} name={forname} colorStyle={colorStyle} />
    </div>
  );
};

export default DirectorPanelMobile;
