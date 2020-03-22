Deploying the site
==================

One-time configuration
----------------------

- follow the instructions for static sites on Google Cloud Storage
- set the index and error pages:

      gsutil web set -m index.html -e 404.html gs://etatunnit.taiteilijat.fi
     
- remember to make the site world-readable:

      gsutil iam ch allUsers:objectViewer gs://etatunnit.taiteilijat.fi 

Updating the site
-----------------

    gcloud config set account my-account-name@gmail.com
    gsutil \
      -m \
      -h "Cache-Control:private, max-age=0, no-transform" \
      rsync -R -x '(\.git|src)/' -d . gs://etatunnit.taiteilijat.fi
