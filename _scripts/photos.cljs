#!/usr/bin/env planck

(require '[planck.shell :refer [sh]]
         '[planck.core :refer [slurp]])

(defn get-env
  [variable-name]
  (let [regex (re-pattern (str variable-name "=(.+)"))
        env (:out (sh "env"))]
    (get (re-find regex env) 1 "")))

(def api-url "https://api.flickr.com/services/rest/?format=json&nojsoncallback=1")

(def useful-keys [:title
                  :url_o
                  :width_o
                  :url_c
                  :width_c
                  :url_m
                  :width_m])

(def params [(str "&api_key=" (get-env "FLICKR_API_KEY"))
             "&method=flickr.people.getPublicPhotos"
             "&user_id=161773835@N07"
             "&per_page=500"
             "&extras=url_o,url_m,url_c"])

(def photos (-> (slurp (str api-url (apply str params)))
                JSON.parse
                (js->clj :keywordize-keys true)
                (get-in [:photos :photo])))

(->> photos
    (map #(select-keys % useful-keys))
    clj->js
    JSON.stringify
    print)
