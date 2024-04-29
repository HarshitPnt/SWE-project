const getParsedTime = (state, setTime) => {
  let date = new Date(state.creation_date);
  let current = new Date();
  if (
    date.getFullYear() + 1 < current.getFullYear() ||
    (date.getFullYear() + 1 == current.getFullYear() &&
      date.getMonth() < current.getMonth())
  )
    setTime(
      (current.getFullYear() - date.getFullYear()).toString() + "yrs ago"
    );
  else if (date.getMonth() != current.getMonth())
    setTime(
      (current.getMonth() - date.getMonth() + 12).toString() + "months ago"
    );
  else if (date.getDate() != current.getDate())
    setTime((current.getDate() - date.getDate()).toString() + "days ago");
  else if (date.getHours() != current.getHours())
    setTime((current.getHours() - date.getHours()).toString() + "hrs ago");
  else if (date.getMinutes() != current.getMinutes())
    setTime(
      (current.getMinutes() - date.getMinutes()).toString() + "minutes ago"
    );
  else
    setTime(
      (current.getSeconds() - date.getSeconds()).toString() + "seconds ago"
    );
};

export default getParsedTime;
