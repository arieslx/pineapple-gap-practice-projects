#include <iostream>
#include <string>

using namespace std;

// clang++ -std=c++17 -stdlib=libc++ -O3 hello_world.cpp; ./a.out; rm a.out

int main(){

    string name;
    cin >> name;
    cout << "hello," << name << endl;
    cout << name.size() << endl;
    name = name + name;
    cout << name << endl;
    return 0;
}