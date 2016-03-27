#include <cv.h>
#include <highgui.h>
#include <iostream>

using namespace cv;
using namespace std;

int main(int argc, char** argv){

	Mat A, B, C;

	/* Read images */
	A = imread("./public/img/bg.png");
	//B = imread("result.png");
	B = imread("./public/img/chiou2.png");

	//B = imread("person.png");
	
	/* Check if loading correctly */
	if( !A.data ) { printf("Error loading A \n"); return -1; }
	if( !B.data ) { printf("Error loading B \n"); return -1; }

	//resize( A, C, Size(264, 383) );
	//addWeighted(C,0.5,B,0.5,0.0,C);

	/* process A->C: resize A to smaller C (keep height: width) */
	int C_wid = 1280;
	int C_h = 2480 * C_wid / 3570;

	resize( A, C, Size(C_wid, C_h) );

	//imshow("C", C);



	/* process B->D (D is a Rect, just select the head and body part of B) */
	
	// need to track head / fix coordinate!!!!!!!!!!!
	int D_startx = 230;
	int D_starty = 110;
	int D_wid = 610;
	int D_h = 700;	//??

	// Select the rect as D
	// D_wid(or cols), D_height(or rows)
	Mat D(B, Rect(D_startx, D_starty, D_wid, D_h));

	// Shrink D to the smaller one
	resize( D, D, Size(D.cols/ 2, D.rows/ 2) );


	/* Composite C and D */
	// The midpoint of the box in "20%" to place D
	int midx = 388;
	int midy = 550;

	// Cols = width; Rows = height
	// Setting roi( the region that is going to be replaced by D, so that the width = D.cols ...)
	Rect roi = Rect(midx - D.cols / 2, midy - D.rows / 2, D.cols, D.rows);  

	// Composite: copy D to C(roi)
	D.copyTo( C(roi));

	// Save the new png
	imshow("C", C);
	imwrite("composite.png", C);

	// wait: use for imshow
	waitKey(0);
	return 0;
}
