// node-import.js continued
const path = require('path');
const fs = require('fs');
const http = require('http');
const axios = require('axios');
var FormData = require('form-data');

(async () => {
  const ids = await axios.get('http://localhost:1337/projects');
  /* console.log(idsData); */

  fs.readdir('./gifs', (error, files) => {
    // handle errors
    if (error) {
      console.log('Error!', error);
    } else {
      // walk through all files
      files.forEach((file) => {
        // on production better check value of `file` to be something that should be processed

        // prepare data to send to server
        const form = new FormData();
        // watch this `data` property here. It contains all of non binary data of your object and it must be JSON.stringified()!
        /*  form.append(
          'data',
          JSON.stringify({
            title: file,
          })
        ); */

        // @see https://strapi.io/documentation/v3.x/plugins/upload.html#upload-file-during-entry-creation
        // the binary data must be prefixed with files.<strapi-field-name> and be a readableStream object

        const currentSlug = file.replace(/\.[^/.]+$/, '');
        const id = ids.data.filter((current) => currentSlug == current.slug)[0]
          .id;

        /*   console.log(ids.data[1]); */

        /* const changeslug = axios({
          method: 'put',
          url: `http://localhost:1337/projects/${id}`,
          data: {
            slug: currentSlug,
          },
        }); */

        form.append(
          'files',
          fs.createReadStream(path.join(__dirname, 'gifs', file))
        );
        form.append('ref', 'project');
        form.append('refId', id);
        form.append('field', 'gif');

        /* putData(form, id); */

        axios
          .post('http://localhost:1337/upload', form)
          .then((response) => {
            const fileId = response.data[0].id;
          })
          .catch((error) => {
            //handle error
          });

        axios
          .post('your-strapi-url/upload', file)
          .then((response) => {
            const fileId = response.data[0].id;

            axios({
              method: 'put',
              url: `http://localhost:1337/projects/${id}`,
              data: {
                gif: fileId,
              },
            })
              .then(({ data }) => {
                setResponse(data);
              })
              .catch((error) => {
                //handle error
              });
          })
          .catch((error) => {
            //handle error
          });
      });
    }
  });
})();

// read directory contents
