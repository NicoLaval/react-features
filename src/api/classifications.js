import axios from 'axios';
import { getCode } from 'utils/classifications';
import { createResource } from 'react-cache';

/**
 * Classifications
 */

const classificationsQuery = () => `
PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX skos:<http://www.w3.org/2004/02/skos/core#>

SELECT ?nomenclature ?libelle WHERE {
	?nomenclature skos:prefLabel ?libelle .
	?nomenclature rdf:type skos:ConceptScheme .
	FILTER(regex(str(?nomenclature),'/codes/'))
	FILTER(lang(?libelle) = 'fr')
}
ORDER BY ?libelle`;

const getClassificationsURL = () =>
	`https://rdf.insee.fr/sparql?query=${encodeURIComponent(
		classificationsQuery()
	)}`;

export const getClassifications = createResource(() =>
	axios
		.get(getClassificationsURL(), {
			headers: { Accept: 'application/json;charset=utf-8' },
		})
		.then(res =>
			res.data.results.bindings.map(({ libelle, nomenclature }) => ({
				intitule: libelle.value,
				code: getCode(nomenclature.value),
			}))
		)
);

/**
 * Classification
 */

const classificationQuery = code => `
PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
PREFIX dc:<http://purl.org/dc/elements/1.1/>
PREFIX xkos:<http://rdf-vocabulary.ddialliance.org/xkos#>
    
SELECT ?label ?description ?previousLabel ?previousId ?nextLabel ?nextId WHERE {
  ?classification rdf:type skos:ConceptScheme .
  FILTER(REGEX(STR(?classification),'/codes/${code}/')) .
  ?classification skos:prefLabel ?label .
  FILTER (lang(?label) = 'fr') .
  OPTIONAL {?classification dc:description ?description  . 
  FILTER (lang(?description) = 'fr') } .
  OPTIONAL {?classification xkos:after ?afterURI .
  ?afterURI skos:prefLabel ?previousLabel .
  FILTER (lang(?previousLabel) = 'fr')  .
  BIND(STRBEFORE(STRAFTER(STR(?afterURI),'/codes/'), '/') AS ?previousId) } .
  OPTIONAL {?classification xkos:before ?beforeURI . 
  ?beforeURI skos:prefLabel ?nextLabel .
  FILTER (lang(?nextLabel) = 'fr')  . 
  BIND(STRBEFORE(STRAFTER(STR(?beforeURI),'/codes/'), '/') AS ?nextId) } 
}`;

const getClassificationURL = code =>
	`https://rdf.insee.fr/sparql?query=${encodeURIComponent(
		classificationQuery(code)
	)}`;

export const getClassification = code =>
	axios
		.get(getClassificationURL(code), {
			headers: { Accept: 'application/json;charset=utf-8' },
		})
		.then(res =>
			Object.entries(res.data.results.bindings[0]).reduce(
				(_, [key, { value }]) => ({ ..._, [key]: value }),
				{}
			)
		);
