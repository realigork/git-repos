import "./RepoItem.css";

function RepoItem(props) {
  return (
    <div className="repo-item">
      <h2>
        <a href={props.html_url} rel="noreferrer" target="_blank">
          {props.name}
        </a>
      </h2>
      <p>
        <strong>Language:</strong> {props.language}&nbsp;&nbsp;&nbsp;
        <strong>Stars:</strong> {props.stargazers_count}
      </p>
      <p>{props.description}</p>
      <button
        className="repo-item__favourite-btn"
        onClick={() => props.toggleFavourite(props.id)}
      >
        {props.isFavourite ? "Unfavourite" : "Favourite"}
      </button>
    </div>
  );
}

export default RepoItem;
