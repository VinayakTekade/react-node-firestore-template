const getArrayOfDocs = (docsObject) => {
  const data = [];
  docsObject.forEach(doc => data.push(doc.data()));
  return data;
}

module.exports = getArrayOfDocs