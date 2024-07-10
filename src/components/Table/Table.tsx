import Rows from "./Rows";
import RowHeader from "./RowHeader";
const Table = ({ header, body }) => {
  return (
    <>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-auto" style={{ maxHeight: "500px" }}>
            <table className="min-w-full table-auto">
              <thead>
                <RowHeader data={header} />
              </thead>
              <tbody className="bg-white">
                <Rows
                  data={{
                    body: body,
                    header: header,
                  }}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Table;
