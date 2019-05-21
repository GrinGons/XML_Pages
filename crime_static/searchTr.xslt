<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:param name="territory" select="'Nova Scotia'"/>
   
  <xsl:template match="/">

    <table style="width:720px" border="1">
        <tr><th bgcolor="#9acd32">
          <font face="Verdana" >Crimes in <xsl:value-of select="$territory"/></font>
        </th><th bgcolor="#9acd32">
          <font face="Verdana" >Incidents</font>
        </th><th bgcolor="#9acd32">
          <font face="Verdana" >Rate(incidents/100,000)</font>
        </th></tr> 
 
            <xsl:variable name="popul" select="//population-millions"/>
          
            <xsl:for-each select="//region[@name = $territory]/crime">
              <xsl:sort select="@incidents" data-type="number" order="descending" />
        
              <tr><td>
                <xsl:value-of select="@type"/>
              </td><td>
                <xsl:value-of select="@incidents"/>
              </td><td>
                <xsl:value-of select="@incidents div $popul div 10"/>
              </td></tr>
            </xsl:for-each>
        
      </table>
    </xsl:template>
</xsl:stylesheet>
