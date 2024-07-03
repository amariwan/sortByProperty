# sortByProperty 

The sortByProperty function is a useful function to sort an array of objects by a specific property, including date properties in various formats. This function is especially useful for applications that retrieve data from various sources and want to display them in a consistent order.

The function takes three arguments:

1. arr: the array of objects to sort.
2. prop: the property to sort by
3. sortOrder: either "asc" for ascending or "desc" for descending


The function first checks whether the specified property contains dates in a certain format (DD.MM.YYY HH:mm:ss). If so, it converts them to ISO format (YYYY-MM-DDHH:mm:ss) so that they can be sorted properly.


The function supports sorting in ascending or descending order and is flexible enough to sort different properties, including date properties in different formats.

The function is easy to use and includes clear documentation to ensure that it is easy to understand. It also includes a separate function to convert ISO date values to German date format to ensure that they are displayed in the user's local language.

Overall, the sortByProperty function is a powerful and useful function that can be useful in any JavaScript application that needs to sort data.
