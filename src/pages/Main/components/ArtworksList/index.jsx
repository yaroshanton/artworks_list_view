import React, { Fragment, useEffect, useState } from "react";
// helpers
import dayjs from "dayjs";
import classNames from "classnames";
import {
  renderDocuments,
  renderPictureSources,
  renderSortIcon,
  renderStatus,
  renderVisibility,
  sortItems,
} from "./helpers";
// data
import artworksData from "../../../../api_data.json";
// utils
import { ASC, DESC } from "utils/constants";
// styles
import styles from "./ArtworksList.module.scss";

const ArtworksList = () => {
  const [artworks, setArtworks] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState(DESC);

  useEffect(() => {
    // TODO: add async function to fetch data from the server
    setArtworks(artworksData.items);
  }, []);

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === DESC ? ASC : DESC;
    setSortField(field);
    setSortDirection(direction);

    const sortedArtworks = sortItems(artworks, field, direction);
    setArtworks(sortedArtworks);
  };

  return (
    <div className={styles.artworksList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("artwork_name")} />
            <th
              onClick={() => handleSort("artwork_name")}
              className={classNames(styles.artworkTitle, {
                [styles.active]: sortField === "artwork_name",
              })}
            >
              Artwork Name{" "}
              {renderSortIcon("artwork_name", sortField, sortDirection, ASC)}
            </th>
            <th
              onClick={() => handleSort("artist_name")}
              className={classNames(styles.artistTitle, {
                [styles.active]: sortField === "artist_name",
              })}
            >
              Artist Name{" "}
              {renderSortIcon("artist_name", sortField, sortDirection, ASC)}
            </th>
            <th
              onClick={() => handleSort("creation_year")}
              className={classNames({
                [styles.active]: sortField === "creation_year",
              })}
            >
              Years{" "}
              {renderSortIcon("creation_year", sortField, sortDirection, ASC)}
            </th>
            <th className={styles.headerTitle}>Status</th>
            <th className={styles.headerTitle}>Visibility</th>
            <th
              onClick={() => handleSort("price")}
              className={classNames({
                [styles.active]: sortField === "price",
              })}
            >
              Price {renderSortIcon("price", sortField, sortDirection, ASC)}
            </th>
            <th className={styles.headerTitle}>Docs</th>
            <th
              onClick={() => handleSort("date_created")}
              className={classNames({
                [styles.active]: sortField === "date_created",
              })}
            >
              Updated {renderSortIcon("date_created")}
            </th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <Fragment key={artwork.id}>
              <tr>
                <td>
                  <picture>
                    {renderPictureSources(artwork.main_photo.transformations)}
                    <img
                      src={`images/${artwork.main_photo.filename_disk}`}
                      alt={artwork.main_photo.title}
                      className={styles.image}
                    />
                  </picture>
                </td>
                <td className={styles.artworkTitle}>
                  {artwork.artwork_name}{" "}
                  {artwork.has_notifications && (
                    <span className={styles.notificationDot}></span>
                  )}
                </td>
                <td className={styles.artistTitle}>{artwork.artist_name}</td>
                <td>{artwork.creation_year}</td>
                <td>{renderStatus(artwork.status)}</td>
                <td>{renderVisibility(artwork.visibility)}</td>
                <td>{`$ ${artwork.price.toLocaleString("en-US")}`}</td>
                <td>{renderDocuments(artwork.documents_number)}</td>
                <td>{dayjs(artwork.date_created).format("DD.MM.YYYY")}</td>
              </tr>
              <div className={styles.highlight} />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtworksList;
