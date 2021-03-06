const { fetchContent, fetchImageUrl } = require('./api');

const getImageUrl = async imageTitle => {
  try {
    const { query } = await fetchImageUrl(imageTitle);
    const [IamNotUsingThis, { imageinfo }] = Object.entries(query.pages)[0];
    return imageinfo[0].url;
  } catch (err) {
    console.log('Could Not Fetch Image Url From Wikipedia: ', err);
  }
};

const getImages = async images => {
  console.log('Fetching Images...');
  const imagesUrls = [];
  for (const image of images) {
    imagesUrls.push(await getImageUrl(image.title));
  }
  return imagesUrls;
};

const get = async sourceContent => {
  try {
    const { query } = await fetchContent(sourceContent.title);
    const [pageId, { title, extract, images, extlinks }] = Object.entries(
      query.pages
    )[0];

    // const imagesUrls = await getImages(images);

    return {
      pageid: pageId,
      title,
      raw: extract,
      summary: extract.split('\n\n\n')[0],
      references: extlinks ? extlinks.map(link => link['*']) : [],
      // images: imagesUrls,
    };
  } catch (err) {
    console.log('Could Not Fetch Content From Wikipedia: ', err);
  }
};

module.exports = {
  get,
};
