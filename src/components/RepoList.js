import { useState, useEffect } from "react";
import RepoItem from "./RepoItem";
import { getLastWeek } from "../utils/date";
import { fetchRepositories } from "../api/repositories";
import { getFavouriteItems, setFavouriteItems } from "../utils/localStorage";
import "./RepoList.css";

const DISPLAY_OPTIONS = {
  All: "All",
  Favourites: "Favourites",
};

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState(getFavouriteItems());
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(DISPLAY_OPTIONS.All);

  useEffect(() => {
    fetchRepositories({ date: getLastWeek() }).then((res) => {
      // Set filters
      const languages = res.items.map((item) => item.language);
      const otherFilters = languages.filter((element, index) => {
        return element != null && languages.indexOf(element) === index;
      });

      setFilters([
        DISPLAY_OPTIONS.All,
        DISPLAY_OPTIONS.Favourites,
        ...otherFilters,
      ]);
      setRepos(res.items);
      setLoading(false);
    });
  }, []);

  const getFilterClassname = (name) => {
    return (
      "repo-list__display__action" +
      (name === currentFilter ? " is-active" : "")
    );
  };

  const isFavourite = (id) => {
    return favourites.indexOf(id) > -1;
  };

  const toggleFavourite = (id) => {
    const items = favourites.slice(0);
    // If favourite list is empty add it
    if (items.length === 0) {
      items.push(id);
    } else {
      // Else if items exists - remove it
      const index = items.indexOf(id);
      if (index !== -1) {
        items.splice(index, 1);
      } else {
        // Or add it
        items.push(id);
      }
    }

    // Update local storage
    setFavouriteItems(items);

    // Re-render
    setFavourites(items);
  };

  const renderItems = () => {
    if (!loading && repos?.length) {
      let items;
      if (currentFilter === DISPLAY_OPTIONS.All) {
        items = repos;
      } else if (currentFilter === DISPLAY_OPTIONS.Favourites) {
        items = repos.filter((repo) => isFavourite(repo.id));
      } else {
        items = repos.filter((repo) => repo.language === currentFilter);
      }

      return items.map((repo) => (
        <RepoItem
          key={repo.id}
          {...repo}
          toggleFavourite={toggleFavourite}
          isFavourite={isFavourite(repo.id)}
        />
      ));
    }

    return false;
  };

  return (
    <div className="repo-list">
      <div className="repo-list__header">
        <h1>Repos</h1>
        {filters.length && (
          <div className="repo-list__display">
            <div>
              <span>
                <strong>Filter:</strong>{" "}
              </span>
              {filters.map((item) => (
                <button
                  key={item}
                  className={getFilterClassname(item)}
                  onClick={() => setCurrentFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {renderItems()}
    </div>
  );
}

export default RepoList;
