/* global gapi */

/**
 * Defines starting point for code body from auth.js.
 */
function start() {
	var list_req = gapi.client.calendar.calendarList.list({});
	
	list_req.execute(function (res) {
		console.log(res.items);
		for (i in res.items) {
			
			$("#calendar-list paper-shadow").append(makeCalItem(res.items[i]));
		}
	});
}

/**
 * Partitions calendars into ownership types
 *
 * @param {Object} cal_list List of google calendars.
 */
function partitionCalList(cal_list) {
	var roles = {};
	for (i in cal_list) {
		var r = cal_list[i].accessRole;
		if (r in roles) {
			roles[r].append(cal_list[i]);
		} else {
			roles[r] = [cal_list[i]];
		}
	}
	return roles;
}


/**
 * Create a new entry in the list of calendars.
 *
 * @param {Object} cal Entry from list of google calendars.
 */
function makeCalItem(cal) {
	var summary = "\n\t\t\t<paper-item><div>"
				+ "<span id=\"cal-name\">" + cal.summary + "</span>"
				// + "<span id=\"add-button\">ADD</span>"
				+ "</div></paper-item>";

	return summary;
}