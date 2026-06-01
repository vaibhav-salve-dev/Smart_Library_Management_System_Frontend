import { X, Filter } from "lucide-react";

interface Props {
  showFilters: boolean;

  setShowFilters: (
    value: boolean
  ) => void;

  filters: {
    genre: string;
    status: string;
    minRating: string;
    minYear: string;
    maxYear: string;

    sortBy: string;

    sortOrder: string;
  };

  setFilters: React.Dispatch<
    React.SetStateAction<any>
  >;
}

function FilterSidebar({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
}: Props) {

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Mystery",
    "Fantasy",
  ];

  const handleChange = (
    field: string,
    value: string
  ) => {
    console.log("field:",field,"    value:",value);

    setFilters((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {

    setFilters({
      genre: "",
      status: "",
      minRating: "",
      minYear: "",
      maxYear: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  return (
    <>
      {/* Overlay */}

      {showFilters && (

        <div
          onClick={() =>
            setShowFilters(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />

      )}

      {/* Sidebar */}

      <div
        className={`
          fixed top-0 left-0 h-full w-80 theme-card border-r-2 border-gray-400 shadow-2xl z-50
          transform transition-transform duration-300 overflow-y-auto
          ${showFilters
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        <div className="p-5">

          {/* Header */}

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-2">

              <Filter className="w-5 h-5 text-indigo-600" />

              <h2 className="text-xl font-bold">
                Filters
              </h2>

            </div>

            <button
              onClick={() =>
                setShowFilters(false)
              }
            >

              <X className="w-6 h-6" />

            </button>

          </div>

          {/* Genre */}

          <div className="mb-5">

            <label className="font-semibold block mb-2">
              Genre
            </label>

            <select
              value={filters.genre}
              onChange={(e) =>
                handleChange(
                  "genre",
                  e.target.value
                )
              }
              className="input-modern"
            >

              <option value="">
                All Genres
              </option>

              {genres.map((genre) => (

                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>

              ))}

            </select>

          </div>

          {/* Status */}

          <div className="mb-5">

            <label className="font-semibold block mb-2">
              Status
            </label>

            <select
              value={filters.status}
              onChange={(e) =>
                handleChange(
                  "status",
                  e.target.value
                )
              }
              className="input-modern"
            >

              <option value="">
                All
              </option>

              <option value="available">
                Available
              </option>

              <option value="borrowed">
                Borrowed
              </option>

            </select>

          </div>

          {/* Rating */}

          <div className="mb-5">

            <label className="font-semibold block mb-2">
              Minimum Rating
            </label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.minRating}
              onChange={(e) =>
                handleChange(
                  "minRating",
                  e.target.value
                )
              }
              className="input-modern"
            />

          </div>

          {/* Years */}

          <div className="grid grid-cols-2 gap-3 mb-5">

            <div>

              <label className="font-semibold block mb-2">
                Min Year
              </label>

              <input
                type="number"
                value={filters.minYear}
                onChange={(e) =>
                  handleChange(
                    "minYear",
                    e.target.value
                  )
                }
                className="input-modern"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Max Year
              </label>

              <input
                type="number"
                value={filters.maxYear}
                onChange={(e) =>
                  handleChange(
                    "maxYear",
                    e.target.value
                  )
                }
                className="input-modern"
              />

            </div>

          </div>

          {/* Sort By */}

<div className="mb-5">

  <label className="font-semibold block mb-2">
    Sort By
  </label>

  <select
    value={filters.sortBy}
    onChange={(e) =>
      handleChange(
        "sortBy",
        e.target.value
      )
    }
    className="input-modern"
  >

    <option value="createdAt">
      Created Date
    </option>

    <option value="title">
      Title
    </option>

    <option value="author">
      Author
    </option>

  </select>

</div>

{/* Sort Order */}

<div className="mb-6">

  <label className="font-semibold block mb-2">
    Sort Order
  </label>

  <select
    value={filters.sortOrder}
    onChange={(e) =>
      handleChange(
        "sortOrder",
        e.target.value
      )
    }
    className="input-modern"
  >

    <option value="asc">
      Ascending
    </option>

    <option value="desc">
      Descending
    </option>

  </select>

</div>
          {/* Buttons */}

          <div className="flex gap-3">

            <button
              onClick={clearFilters}
              className="flex-1 border rounded-lg py-2 font-semibold"
            >
              Clear
            </button>

            <button
              onClick={() =>
                setShowFilters(false)
              }
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 font-semibold"
            >
              Apply
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default FilterSidebar;
