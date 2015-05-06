/* global gapi */

var TYPES = ["owner", "writer", "reader", "freeBusyReader"];

var CAL_ACCESS = {"owner": "Calendars you own",
				 "writer": "Calendars you can update",
				 "reader": "Calendars you can see",
				 "freeBusyReader": "Calendars that show when people are busy"};

/**
 * Defines starting point for code body from auth.js.
 */
function start() {
	var list_req = gapi.client.calendar.calendarList.list({});
	
	list_req.execute(function (res) {
		var paritioned = partitionCalList(res.items);

		var cal_types = TYPES.filter(function (t) { return t in paritioned; });

		for (i in cal_types) { var type = cal_types[i];
			var cals = "\n\t\t<h3>" + CAL_ACCESS[type]
					 + "</h3>\n\t\t<paper-shadow>";
			for (j in paritioned[type]) { var cal = paritioned[type][j];
				cals += makeCalItem(cal);
			}
			cals += "</paper-shadow>";
			$("#calendar-list").append(cals);
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
			roles[r].push(cal_list[i]);
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