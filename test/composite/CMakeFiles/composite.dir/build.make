# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 2.8

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list

# Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/chipcheng/ubuntu/door/Door/lie/composite

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/chipcheng/ubuntu/door/Door/lie/composite

# Include any dependencies generated for this target.
include CMakeFiles/composite.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/composite.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/composite.dir/flags.make

CMakeFiles/composite.dir/composite.cpp.o: CMakeFiles/composite.dir/flags.make
CMakeFiles/composite.dir/composite.cpp.o: composite.cpp
	$(CMAKE_COMMAND) -E cmake_progress_report /home/chipcheng/ubuntu/door/Door/lie/composite/CMakeFiles $(CMAKE_PROGRESS_1)
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Building CXX object CMakeFiles/composite.dir/composite.cpp.o"
	/usr/bin/c++   $(CXX_DEFINES) $(CXX_FLAGS) -o CMakeFiles/composite.dir/composite.cpp.o -c /home/chipcheng/ubuntu/door/Door/lie/composite/composite.cpp

CMakeFiles/composite.dir/composite.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/composite.dir/composite.cpp.i"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_FLAGS) -E /home/chipcheng/ubuntu/door/Door/lie/composite/composite.cpp > CMakeFiles/composite.dir/composite.cpp.i

CMakeFiles/composite.dir/composite.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/composite.dir/composite.cpp.s"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_FLAGS) -S /home/chipcheng/ubuntu/door/Door/lie/composite/composite.cpp -o CMakeFiles/composite.dir/composite.cpp.s

CMakeFiles/composite.dir/composite.cpp.o.requires:
.PHONY : CMakeFiles/composite.dir/composite.cpp.o.requires

CMakeFiles/composite.dir/composite.cpp.o.provides: CMakeFiles/composite.dir/composite.cpp.o.requires
	$(MAKE) -f CMakeFiles/composite.dir/build.make CMakeFiles/composite.dir/composite.cpp.o.provides.build
.PHONY : CMakeFiles/composite.dir/composite.cpp.o.provides

CMakeFiles/composite.dir/composite.cpp.o.provides.build: CMakeFiles/composite.dir/composite.cpp.o

# Object files for target composite
composite_OBJECTS = \
"CMakeFiles/composite.dir/composite.cpp.o"

# External object files for target composite
composite_EXTERNAL_OBJECTS =

composite: CMakeFiles/composite.dir/composite.cpp.o
composite: CMakeFiles/composite.dir/build.make
composite: /usr/local/lib/libopencv_calib3d.so
composite: /usr/local/lib/libopencv_contrib.so
composite: /usr/local/lib/libopencv_core.so
composite: /usr/local/lib/libopencv_features2d.so
composite: /usr/local/lib/libopencv_flann.so
composite: /usr/local/lib/libopencv_gpu.so
composite: /usr/local/lib/libopencv_highgui.so
composite: /usr/local/lib/libopencv_imgproc.so
composite: /usr/local/lib/libopencv_legacy.so
composite: /usr/local/lib/libopencv_ml.so
composite: /usr/local/lib/libopencv_nonfree.so
composite: /usr/local/lib/libopencv_objdetect.so
composite: /usr/local/lib/libopencv_photo.so
composite: /usr/local/lib/libopencv_stitching.so
composite: /usr/local/lib/libopencv_superres.so
composite: /usr/local/lib/libopencv_ts.so
composite: /usr/local/lib/libopencv_video.so
composite: /usr/local/lib/libopencv_videostab.so
composite: CMakeFiles/composite.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --red --bold "Linking CXX executable composite"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/composite.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/composite.dir/build: composite
.PHONY : CMakeFiles/composite.dir/build

CMakeFiles/composite.dir/requires: CMakeFiles/composite.dir/composite.cpp.o.requires
.PHONY : CMakeFiles/composite.dir/requires

CMakeFiles/composite.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/composite.dir/cmake_clean.cmake
.PHONY : CMakeFiles/composite.dir/clean

CMakeFiles/composite.dir/depend:
	cd /home/chipcheng/ubuntu/door/Door/lie/composite && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/chipcheng/ubuntu/door/Door/lie/composite /home/chipcheng/ubuntu/door/Door/lie/composite /home/chipcheng/ubuntu/door/Door/lie/composite /home/chipcheng/ubuntu/door/Door/lie/composite /home/chipcheng/ubuntu/door/Door/lie/composite/CMakeFiles/composite.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/composite.dir/depend
