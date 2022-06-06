import { useState, useEffect } from "react";
import RepoItem from "./RepoItem";
import { getLastWeek } from "../utils/date";
import { fetchRepositories } from "../api/repositories";
import { getFavouriteItems, setFavouriteItems } from "../utils/localStorage";
import "./RepoList.css";

const FILTERS = {
  Filter: "Filter",
  Sort: "Sort",
};

const LANGUAGE_OPTIONS = {
  All: "All",
  Favourites: "Favourites",
};

const SORT_OPTIONS = {
  Asc: "Ascending",
  Desc: "Descending",
};

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState(getFavouriteItems());
  const [languageFilters, setLanguageFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    [FILTERS.Filter]: LANGUAGE_OPTIONS.All,
    [FILTERS.Sort]: undefined,
  });

  useEffect(() => {
    fetchRepositories({ date: getLastWeek() }).then((res) => {
      // Set filters
      const languages = res.items.map((item) => item.language);
      const otherFilters = languages.filter((element, index) => {
        return element != null && languages.indexOf(element) === index;
      });

      setLanguageFilters([
        LANGUAGE_OPTIONS.All,
        LANGUAGE_OPTIONS.Favourites,
        ...otherFilters,
      ]);
      setRepos(res.items);
      setLoading(false);
    });
  }, []);

  const getFilterClassname = (filter, name) => {
    return (
      "repo-list__display__action" +
      (name === currentFilter[filter] ? " is-active" : "")
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

  const handleUpdateCurrentFilters = (filter, value) => {
    // Reset Sort filter when clicking on the active item
    let filterValue =
      filter === FILTERS.Sort && currentFilter[filter] === value
        ? undefined
        : value;
    const filters = Object.assign(
      {},
      {
        ...currentFilter,
        [filter]: filterValue,
      }
    );

    setCurrentFilter(filters);
  };

  const renderItems = () => {
    if (!loading && repos?.length) {
      let items;
      // Get items filtered by language
      if (currentFilter[FILTERS.Filter] === LANGUAGE_OPTIONS.All) {
        items = repos.slice(0);
      } else if (
        currentFilter[FILTERS.Filter] === LANGUAGE_OPTIONS.Favourites
      ) {
        items = repos.filter((repo) => isFavourite(repo.id));
      } else {
        items = repos.filter(
          (repo) => repo.language === currentFilter[FILTERS.Filter]
        );
      }

      // Get sorted items
      switch (currentFilter[FILTERS.Sort]) {
        case SORT_OPTIONS.Asc:
          items = items.sort((a, b) => a.stargazers_count - b.stargazers_count);
          break;

        case SORT_OPTIONS.Desc:
          items = items.sort((a, b) => b.stargazers_count - a.stargazers_count);
          break;

        default:
          break;
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
        {languageFilters.length && (
          <div className="repo-list__display">
            <div>
              <span>
                <strong>Filter:</strong>{" "}
              </span>
              {languageFilters.map((item) => (
                <button
                  key={item}
                  className={getFilterClassname(FILTERS.Filter, item)}
                  onClick={() =>
                    handleUpdateCurrentFilters(FILTERS.Filter, item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="repo-list__display">
          <div>
            <span>
              <strong>Sort:</strong>{" "}
            </span>
            <button
              className={getFilterClassname(FILTERS.Sort, SORT_OPTIONS.Asc)}
              onClick={() =>
                handleUpdateCurrentFilters(FILTERS.Sort, SORT_OPTIONS.Asc)
              }
            >
              Ascending
            </button>
            <button
              className={getFilterClassname(FILTERS.Sort, SORT_OPTIONS.Desc)}
              onClick={() =>
                handleUpdateCurrentFilters(FILTERS.Sort, SORT_OPTIONS.Desc)
              }
            >
              Descending
            </button>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {renderItems()}
    </div>
  );
}

export default RepoList;
