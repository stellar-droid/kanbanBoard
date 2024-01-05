import React from 'react';

const RackDeviceList = () => {
  const data = [
    { id: '192.148.11.45', name: 'OPM-Server31' },
    { id: '192.148.11.89', name: 'OPM-Switch6' },
    { id: '192.148.11.43', name: 'OPM-Server29' },
    { id: '192.148.11.87', name: 'OPM-Switch5' },
    { id: '192.168.50.18', name: '192.168.50.18' },
    { id: '192.148.11.47', name: 'OPM-Server33' },
    { id: '192.148.11.82', name: 'OPM-RAID19' },
    { id: '192.148.11.81', name: 'OPM-PrintServer' },
    { id: '192.148.11.80', name: 'OPM-Server47' },
    { id: '192.148.11.42', name: 'OPM-Server28' },
    { id: '192.148.11.86', name: 'OPM-Switch4' },
    { id: '192.148.11.85', name: 'OPM-Router1' },
    { id: '192.148.11.41', name: 'OPM-Server27' },
    { id: '192.148.11.40', name: 'OPM-Server26' },
    { id: '192.148.11.116', name: 'OPM-Server54' },
    { id: '192.148.11.114', name: 'OPM-Server53' },
    { id: '192.148.11.113', name: 'OPM-Server52' },
    { id: '192.148.11.79', name: 'OPM-RAID18' },
    { id: '192.148.11.35', name: 'OPM-Server22' },
    { id: '192.148.11.34', name: 'OPM-Server21' },
  ];

  return (
    <div className="opmAddEditDeviceList" style={{ position: 'fixed', top: 0, left: 0 }}>
      <div className="opmAddEditDeviceListhdr">
        Available Devices (<span id="remaingDevList_Rck">{data.length}</span>)
        <br />
        <span style={{ fontSize: '10px', textDecoration: 'none', cursor: 'pointer' }} id="dragMenu">
          (Drag and Drop)
        </span>
      </div>
      <div
        className="bvDeviceSrch"
        style={{
          top: '20px',
          width: '91%',
          marginLeft: '7px',
        }}
      >
        <input type="text" id="rack_devNameSearchTxt" onKeyPress={() => {}} onKeyUp={() => {}} />
      </div>
      <div className="opmAddEditDeviceListContent" style={{ top: '50px', height: '300px', overflowY: 'auto' }}>
        {/* Added container div for scroll */}
        <div style={{ height: '100%', overflowY: 'scroll' }}>
          <table cellspacing="0" cellpadding="0" style={{}} width="220px" id="rbDeviceTable" height="100px">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="rackDevicesList">
                    <div className="devdraggable ui-draggable ui-draggable-handle" id={item.id}>
                      {item.name}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RackDeviceList;
