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

export const addLabel = (iso3) => {
	const toLabel = ['UKR', 'RUS', 'CAN', 'USA', 'GBR', 'ISL', 'DNK', 'FIN'];
	return toLabel.find((d) => d === iso3);
};

export const changeName = (iso3) => {
	const newNames = [
		{ iso3: 'RUS', name: 'Rusia' },
		{ iso3: 'USA', name: 'EE.UU' },
		{ iso3: 'GBR', name: 'U.K' },
	];

	const label = newNames.find((d) => d.iso3 === iso3)?.name;

	return label;
};
export const move = (iso3) => {
	const newNames = [
		{ iso3: 'RUS', translate: ['2%', '0%'] },
		{ iso3: 'GBR', translate: ['-4%', '0%'] },
		{ iso3: 'USA', translate: ['-3%', '4%'] },
		{ iso3: 'CAN', translate: ['-2%', '-5%'] },
		{ iso3: 'ISL', translate: ['0%', '4%'] },
		{ iso3: 'UKR', translate: ['0%', '1%'] },
	];

	const move = newNames.find((d) => d.iso3 === iso3)?.translate;
	if (move) return move.toString();

	return '0%,0%';
};
