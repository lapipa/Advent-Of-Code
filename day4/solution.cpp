#include <string>
#include <fstream>
#include <iostream>
#include <vector>

/**
 * could be a template for future solutions
 */
using namespace std;
class Solution
{
public:
    vector<vector<char>> grid;
    Solution(vector<vector<char>> grid)
    {
        this->grid = grid;
    }

    // could create a hash map of the x,y so we could map the pair to a letter faster so we dont have to look up the same coords multiple times? does it matter?
    // need out of bounds safety guard
    auto lookAroundForClues(vector<vector<char>> &christmas, int x_coord, int y_coord, char lookingFor)
    {

        vector<pair<int, int>> coordinates_to_verify;
        vector<pair<int, int>> direction_vectors;
        for (int x_delta = -1; x_delta <= 1; x_delta++)
        {
            for (int y_delta = -1; y_delta <= 1; y_delta++)
            {
                pair<int, int> coord(x_coord + x_delta, y_coord + y_delta);
                if (coord.first < christmas.size() && coord.second < christmas[0].size())
                {
                    if (coord.first >= 0 && coord.second >= 0)
                    {
                        coordinates_to_verify.push_back(coord);
                    }
                }
            }
        }

        for (int i = 0; i < coordinates_to_verify.size(); i++)
        {
            if (christmas[coordinates_to_verify[i].first][coordinates_to_verify[i].second] == lookingFor)
            {
                direction_vectors.emplace_back(pair<int, int>(coordinates_to_verify[i].first - x_coord, coordinates_to_verify[i].second - y_coord)); // direction vector
            }
        }

        return direction_vectors;
    }
    auto isPointValid(pair<int, int> point)
    {
        if (point.first < grid.size() && point.second < grid[0].size())
        {
            if (point.first >= 0 && point.second >= 0)
            {
                return true;
            }
        }

        return false;
    }
    auto find_subword_direction(vector<vector<char>> &christmas, string word, int x_start, int y_start, pair<int, int> direction_vector)
    {
        // cout << "Subword around (" << x_start << "," << y_start << ") " << endl;
        for (int i = 0; i < word.length(); i++)
        {
            auto point_to_check = pair<int, int>(direction_vector.first * i + x_start, direction_vector.second * i + y_start);
            if (!isPointValid(point_to_check))
            {
                // cout << "not valid , invalid point  (" << point_to_check.first << "," << point_to_check.second << ") " << endl;
                return false;
            }
            // cout << "Char " << christmas[point_to_check.first][point_to_check.second] << " looking for " << word[i] << endl;
            if (christmas[point_to_check.first][point_to_check.second] != word[i])
            {
                // cout << "not valid" << endl;
                return false;
            }
        }
        return true;
    }

    /**
     * Grab a specific x,y and count all the words found from this index
     */
    auto findWord(vector<vector<char>> &christmas, string word, int x_start, int y_start)
    {
        // cout << "Will try to find " << word << " around (" << x_start << "," << y_start << ") " << endl;
        ;
        auto next = word[1];
        auto found = false;
        auto start = pair<int, int>(x_start, y_start);
        auto fromStartCount = 0;
        if (christmas[x_start][y_start] != word[0])
        {
            // cout << "Found " << direction_vectors.size() << " clues!" << endl;
            return fromStartCount;
        }
        auto direction_vectors = lookAroundForClues(christmas, x_start, y_start, word[1]);

        // cout << "Found " << direction_vectors.size() << " clues!" << endl;

        /**
         * direction vector will always be equal to the amount of next char founds around the start indeces
         */
        for (int i = 0; i < direction_vectors.size(); i++)
        {
            auto dir_vec = direction_vectors[i];
            if (find_subword_direction(christmas, word.substr(1), x_start + dir_vec.first, y_start + dir_vec.second, dir_vec))
            {
                fromStartCount++;
            }
        }
        // cout << "Found " << fromStartCount << " words!" << endl;
        return fromStartCount;
    }

    auto find_crossed_xmas(vector<vector<char>> &christmas, int x_start, int y_start)
    {

        // use A pivot
        if (christmas[x_start][y_start] != 'A')
        {
            return false;
        }

        // cout << "============== Will try to find crossed" << " around (" << x_start << "," << y_start << ") " << endl;
        // cout << "pivot found" << endl;
        auto s_clues = lookAroundForClues(christmas, x_start, y_start, 'S');
        auto m_clues = lookAroundForClues(christmas, x_start, y_start, 'M');
        auto crosses = 0;

        if (m_clues.size() < 2 || s_clues.size() < 2)
        {
            // cout << "too low clues " << endl;
            return false;
        }

        for (int i = 0; i < m_clues.size(); i++)
        {
            if (m_clues[i].first != 0 && m_clues[i].second != 0)
            {
                auto point_to_check = pair<int, int>(x_start + m_clues[i].first*-1,y_start + m_clues[i].second*-1 );
                if (!isPointValid(point_to_check))
                {
                    // cout << "ERROR: not valid , invalid point  (" << point_to_check.first << "," << point_to_check.second << ") " << endl;
                }
                else
                {

                    // cout << "Found M clue at (" << x_start + m_clues[i].first << "," << y_start + m_clues[i].second << ") dir " << m_clues[i].first << "," << m_clues[i].second << endl;
                    // cout << "checking out (" << point_to_check.first << "," << point_to_check.second << ")" << endl;
                    if (christmas[point_to_check.first][point_to_check.second] == 'S')
                    {   
                        // cout << "Point checked out (" << point_to_check.first << "," << point_to_check.second << ")" << endl;
                        crosses++;
                    }
                }
            }
        }

        if (crosses == 2)
        {
            return true;
        }

        // cout << "ERROR: Only " << crosses << " crossed" << endl;
        return false;
    }
};

/**
 * This will be translated to deno code
 */
int main()
{
    string input_path = "input.txt";
    // read input as 2x2 array
    ifstream file(input_path);
    vector<vector<char>> rows;
    string line;

    while (getline(file, line))
    {
        vector<char> row(line.begin(), line.end());
        rows.emplace_back(row);
        // cout <<  "rowsize: " << row.size() << endl;
    }
    // cout << "number of rows " << rows.size() << endl;
    file.close();

    auto sol = Solution(rows);
    auto wordcounts = 0;
    auto crossed_mas_count = 0;
    for (int i = 0; i < rows.size(); i++)
    {
        for (int j = 0; j < rows[i].size(); j++)
        {
            // cout <<  "row size: " << rows[i].size() << endl;
            wordcounts += sol.findWord(rows, "XMAS", i, j);
            if (sol.find_crossed_xmas(rows, i, j))
            {
                crossed_mas_count++;
            }
        }
    }
    cout << "Found " << wordcounts << " XMAS :D" << endl;
    cout << "Found " << crossed_mas_count << " XMAS :D" << endl;
}