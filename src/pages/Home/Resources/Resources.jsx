import React from "react";
import { Link } from "react-router";
const Resources = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th> <th>Name</th> <th>URL</th>{" "}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th> <td>Roktobondhu</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="https://l.facebook.com/l.php?u=https%3A%2F%2Froktobondhu.com%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExY0kwUlFuU3hTQld4N09IU3NydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6gRwMJK_Ya14SeCq9TDhYtwXzv1bn03SLWf-usZpgEv6IfP_bMZ8Ul_SR56A_aem_-7TCHQK3s82-DTQeN7BBXA&h=AT2olRiXX6mRRhw33ArE3A0WhV030QFmBVunTBrBTA97Thc8psP1YkjwHp6E43NUk0dp3Pc4Oj_AcoWw7obYCq5BxjavWMWxjgtHip48F3zjHCMSA9xNB2VfuPxeelpqlccJu3G4KoPbbwSc&__tn__=-UK-R&c[0]=AT3zZjG5NZlH-dsgPReBisO4dQjhDx_rnjkhOodApIWHvbDgW4e8NagLdt4luaOE7smlR-Yt3DoGPQsZEHVg3CLloh-Qk3jMomQmor4WAXIhwhCGpVE9xLk3Ou9D2CLl5d3AKHu4K3LHYbwkUYaghARlMceldOKI18NxwP21qoi0R_lwQaKd9RhKlCHs_ps5XB06zfk8FFXWtamj-HO10ZXdIA"
                >
                  Visit
                </Link>
              </td>
            </tr>
            <tr>
              <th>1</th> <td>DonateBloodBD</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="https://donatebloodbd.com/"
                >
                  Visit
                </Link>
              </td>
            </tr>
            <tr>
              <th>1</th> <td>Bangladesh Scouts</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="https://service.scouts.gov.bd/blood-donation/6"
                >
                  Visit
                </Link>
              </td>
            </tr>
            <tr>
              <th>1</th> <td>Sera Doctor</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="https://seradoctor.com/service/blood-donors-club"
                >
                  Visit
                </Link>
              </td>
            </tr>
            <tr>
              <th>1</th> <td>DU Statistics Dept</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="https://www.stat.du.ac.bd/co-curriculum/blood-donation/"
                >
                  Visit
                </Link>
              </td>
            </tr>
            <tr>
              <th>1</th> <td>Blood Man</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="http://103.48.16.216/ad/blood/index_out.php"
                >
                  Visit
                </Link>
              </td>
            </tr>
            <tr>
              <th>1</th> <td>1000 Donor List</td>{" "}
              <td>
                <Link
                  className="btn"
                  target="_blank"
                  to="https://drive.google.com/file/d/1eq8JrPxCIbocHpTtM9LMWWVKI-K8UGAW/edit"
                >
                  Visit
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Resources;
