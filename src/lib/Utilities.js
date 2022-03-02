export const mouseAdjusted = (mousex, mousey, svg) => {
	return [(mousex - svg.e) / svg.a, (mousey - svg.f) / svg.d];
};

export const isBan = (iso3) => {
	const EU = [
		['Austria', 'AUT'],
		['Belgium', 'BEL'],
		['Bulgaria', 'BGR'],
		['Croatia', 'HRV'],
		['Cyprus', 'CYP'],
		['Czech Republic', 'CZE'],
		['Denmark', 'DNK'],
		['Estonia', 'EST'],
		['Finland', 'FIN'],
		['France', 'FRA'],
		['Germany', 'DEU'],
		['Greece', 'GRC'],
		['Hungary', 'HUN'],
		['Ireland', 'IRL'],
		['Italy', 'ITA'],
		['Latvia', 'LVA'],
		['Lithuania', 'LTU'],
		['Luxembourg', 'LUX'],
		['Malta', 'MLT'],
		['Netherlands', 'NLD'],
		['Poland', 'POL'],
		['Portugal', 'PRT'],
		['Romania', 'ROU'],
		['Slovakia', 'SVK'],
		['Slovenia', 'SVN'],
		['Spain', 'ESP'],
		['Sweden', 'SWE'],
	];

	const nonEU = [
		['United States of America', 'USA'],
		['Canada', 'CAN'],
		['Great Britain', 'GBR'],
		['Iceland', 'ISL'],
		['Norway', 'NOR'],
		['Switzerland', 'CHE'],
		['ALbania', 'ALB'],
		['Moldova', 'MDA'],
		['North Macedonia', 'MKD'],
	];
	const eu = EU.find((d) => d[1] === iso3);
	const oths = nonEU.find((d) => d[1] == iso3);

	if (eu) return 'eu';
	if (oths) return 'non-eu';
	return 'no-restricted';
};
