$inputFile = "d:\mco\trabajo_final\datos\qog\qog_std_ts_jan24.csv"
$outputFile = "d:\mco\trabajo_final\datos\qog\kpis_terrorismo.csv"

Write-Host "Reading CSV from $inputFile..."

# Define columns to extract
$columnsToKeep = @(
    "ccode", "cname", "year", "ccodealp", 
    "ucdp_type1", "ucdp_type2", "ucdp_type3", "ucdp_type4",
    "wdi_gdpcapcur", "wdi_pop"
)

# Use Import-Csv to correctly handle quoted CSV fields
# Pipe to Select-Object to filter columns
# Pipe to Export-Csv to save result
# -UseCulture is avoided to enforce comma delimiter if machine locale is different
Import-Csv -Path $inputFile | 
Select-Object $columnsToKeep | 
Export-Csv -Path $outputFile -NoTypeInformation -Encoding UTF8

Write-Host "Done! Processed data saved to $outputFile"
