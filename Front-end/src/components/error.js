function Error({statusCode}) {
  let errorMessage = "";

  switch (statusCode) {
    case 404:
      errorMessage = "Oops! The requested resource was not found.";
      break;
    case 401:
      errorMessage =
        "Access denied! You are not authorized to view this content.";
      break;
    case 429:
      errorMessage =
        "Slow down! You've reached the request limit. Please try again later.";
      break;
    case 500:
      errorMessage = "Internal server error. Please contact support.";
      break;
    case 503:
      errorMessage = "Service unavailable. Please try again later.";
      break;
    default:
      errorMessage = "Something went wrong.";
  }

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
}

export default Error;
