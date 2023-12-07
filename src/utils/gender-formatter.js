const genderFormatter = (gender) => {
  if (gender === "Male") {
    return `${gender} 👨`;
  } else if (gender === "Female") {
    return `${gender} 👩`;
  } else if (gender === "Genderless") {
    return `${gender} 🤷‍♂️‍🤷‍♀️`;
  } else {
    return `${gender} ❓`;
  }
};

export default genderFormatter;
