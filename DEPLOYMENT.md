Deploying the site
==================

## Google Cloud Deployment (Obsolete)

The following instructions are for deploying the site to Google Cloud Storage. This method is now obsolete and should not be used for new deployments.

One-time configuration
----------------------

-   Follow the instructions for static sites on Google Cloud Storage
-   Set the index and error pages:

        gsutil web set -m index.html -e 404.html gs://etatunnit.taiteilijat.fi

-   Remember to make the site world-readable:

        gsutil iam ch allUsers:objectViewer gs://etatunnit.taiteilijat.fi

Updating the site
-----------------

    gcloud config set account my-account-name@gmail.com
    gsutil \
      -m \
      -h "Cache-Control:private, max-age=0, no-transform" \
      rsync -R -x '(\.git|src)/' -d . gs://etatunnit.taiteilijat.fi

## GitHub Pages Deployment (Recommended)

The site is now automatically deployed to GitHub Pages on every push to the `master` branch, using the workflow defined in `.github/workflows/deploy.yml`.

One-time configuration
----------------------

1.  **Enable GitHub Pages:** In your repository settings, go to "Pages" and select the `master` branch as the source.
2.  **Configure Custom Domain (Optional):**
    *   Add a `CNAME` file to the root of your repository containing your domain name (e.g., `etatunnit.taiteilijat.fi`).
    *   Configure your domain's DNS settings to point to GitHub Pages. You'll need to create an `A` record pointing to GitHub's IP addresses and a `CNAME` record pointing to your GitHub Pages subdomain. Refer to the GitHub Pages documentation for the correct IP addresses and subdomain.
