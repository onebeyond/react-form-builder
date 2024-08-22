/**
 * Return value type for the country subdivision question.
 * @enum {CountrySubdivisionValueType}
 * @readonly
 * @property {string} ISO_CODE - ISO 3166-2 code of the country subdivision without the country code.
 * @property {string} FULL_ISO_CODE - Full ISO 3166-2 code of the country subdivision (code of the country as prefix).
 * @property {string} NAME - Name of the country subdivision.
 */
export const CountrySubdivisionValueType = {
  ISO_CODE: "iso_code",
  FULL_ISO_CODE: "full_iso_code",
  NAME: "name"
}